/* eslint-disable require-jsdoc */
import * as d3 from 'd3'
import mapboxgl from 'mapbox-gl'
import * as topojson from 'topojson-client'
import renderProperties from './renderProperties.js'
import dta from '../assets/data/intro_nhv.json'
import displayText from '../utils/displayText.js'

const renderIntro = (map) => {
  const canvas = d3.select('#map').select('canvas#container')
  const ctx = canvas.node().getContext('2d')
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.attr('width', width * window.devicePixelRatio)
    .attr('height', height * window.devicePixelRatio)
    .style('width', width + 'px')
    .style('height', height + 'px')
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // projection function for a geotransform stream (otherwise the "this" reference breaks)
  // also don't change the function(){} to arrow syntax here, that also breaks the "this" keyword
  function projectStream(lon, lat) {
    // the "rosetta stone" between mapbox gl and d3
    const point = map.project(new mapboxgl.LngLat(lon, lat))
    // eslint-disable-next-line no-invalid-this
    return this.stream.point(point.x, point.y)
  }
  // see https://franksh.com/posts/d3-mapboxgl/ and https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9
  const transform = d3.geoTransform({point: projectStream})
  const pathSVG = d3.geoPath().projection(transform)
  const path = d3.geoPath().projection(transform).context(ctx)

  displayText(0, animateOut)

  const snakes = Array(4).fill(Array(2))
  const snakeColors = Array(4)

  const features = topojson
    .feature(dta, dta.objects.intro_nhv)
    .features

  const svg = d3.select('#map').append('svg')
    .style('width', width + 'px')
    .style('height', height + 'px')
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .style('pointer-events', 'none')

  const arcs = svg.append('path')
    .datum(topojson.mesh(dta))
    .attr('d', pathSVG)
    .attr('class', 'nhv-blocks')
    .style('fill', 'none')
    .style('stroke', '#002b36')
    .style('opacity', 0.5)
    .style('stroke-width', 1.5)
    .style('stroke-dasharray', '100 10')

  map.on('move', () => {
    arcs.attr('d', pathSVG)
  })

  // animating
  const cycleLength = 6000
  // a timer for the snake position values only
  //  it only runs at most every 200 milliseconds
  const snakeTimer = d3.interval((elapsed) => {
    snakes.forEach((snake, i, array) => {
      updateSnake(snake, i, array, elapsed / cycleLength)
    })
  }, 40)

  // to maintain performance and work with the mapbox drag actions
  //  animations should just be fast as browser allows
  const timer = d3.timer((elapsed) => drawFrame(elapsed / cycleLength))


  // ----------------------------------
  // Section 2: Animation functions that will be called in d3.timer() to update the canvas

  // Given a snake (defined as a two element array, the first being geometries and the second being block IDs)
  // with index i in the snakesArray (the entire collection of snakes),
  // this function either picks a random place and color or pushes a new block onto the snake to "extend" it
  function updateSnake(snake, i, snakesArray, t) {
    const isBeginning = snake.every((d) => typeof(d) === 'undefined')
    // test if t (on a loop) is close to 0. If yes, start a new snake
    const shouldRestart = 1 / 64 > (t * (i + 1) - Math.floor(t * (i + 1)))
    const shouldMakeNewSnake = isBeginning || shouldRestart

    let snakeShapes; let snakeIDs
    if (shouldMakeNewSnake) { 
      // generate a random color. idk where that number came from lmao
      snakeColors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      // pick a random block and put its ID into this array of IDs of the blocks in the snake 
      //  so that we can make sure not to add a block that's already in the snake later on
      snakeIDs = [Math.floor(Math.random() * 1494)] 
      snakeShapes = [features[snakeIDs]] // the corresponding geometry as a one-element array
    } else {
      snakeShapes = snake[0]
      snakeIDs = snake[1]
      // neighbors array of last census block in the snake: some choices for what to add to the snake next
      if (typeof(snakeShapes.slice(-1)[0]) == 'undefined') console.log(snakeShapes)
      let nbors = snakeShapes.slice(-1)[0].properties.neighbors
      nbors = nbors.filter(function(x) {
        return snakeIDs.indexOf(x - 1) < 0
      })[0] // get the first item in that neighbors array that doesn't overlap with what's already in the snake
      snakeIDs.push(nbors - 1) // add the corresponding geometry to the snake
      snakeShapes.push(features[nbors - 1])
    }
    
    // make sure there's only 15 elements in the snake at a time
    // if needed, just remove the first one to keep the snake moving
    if (snakeShapes.length > 15) {
      snakeShapes.shift()
      snakeIDs.shift()
    }

    snakesArray[i] = [snakeShapes, snakeIDs]
  }

  // Given a time 't', this function
  // 1) draws the blocks, 2) makes a blue "wave" spreading out from the center of New Haven, and
  // 3) renders "snakes" as updated by the updateSnake function above.
  function drawFrame(t) {
    arcs.style('stroke-dashoffset', -(t - 1) * 50)

    // the "wave": make an eight-layer fill
    ctx.save()
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.fillStyle = '#038cfc'
    Array(8).fill(0).forEach((_, i) => {
      // filter for the properties between given distances away from the new haven green
      const subset = features.filter((d) => {
        return d.properties.dist < (t - (.05 * i)) &&
      d.properties.dist > (t - (0.05 * (i + 1)))
      })
      ctx.globalAlpha = .5 - (i * .1)
      path({type: 'FeatureCollection',
        features: subset})
      ctx.fill()
    })
    ctx.closePath()

    // draws the snakes
    snakes.forEach((snake, snakeIndex) => {
      if (typeof(snake[0]) == 'undefined') return snake[0]
      snake[0].forEach((d, i) => {
        ctx.beginPath()
        ctx.fillStyle = snakeColors[snakeIndex]
        ctx.globalAlpha = .07 * i
        path({type: 'FeatureCollection',
          features: [d]})
        ctx.fill()
        ctx.restore()
      })
    })
  }

  // this function runs drawFrame "backwards", erases the canvas, and brings in the next map
  function animateOut() {
    snakeTimer.stop()
    timer.stop()
    map.easeTo({
      duration: 250,
      zoom: 13,
      center: [-72.931, 41.31099],
    })

    // preloads the grid video animation, which comes after the following map (e.g. load in advance)
    map.getSource('gridVideoSource').getVideo().loop = false

    // animate out and begin the next map 
    const duration = 1500

    arcs.transition()
      .duration(duration)
      .style('stroke-dasharray', '0 0')
      .style('opacity', 0)
    canvas.transition()
      .duration(duration)
      .style('opacity', 0)
    d3.select('.mapboxgl-canvas')
      .transition()
      .duration(duration)
      .style('opacity', 1)

    const outTimer = d3.timer((elapsed) => {
      const t = d3.easeCubicInOut(elapsed / duration) 
      drawFrame(2 - t)

      if (t > 1) {
        // canvas was covering up mapbox click events before
        // we're not going to take it off of the DOM though because we'll still use it for the world map
        canvas.style('display', 'none')
        renderProperties(map)
        outTimer.stop()
      }
    })
  }
}

export default renderIntro
