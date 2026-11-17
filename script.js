(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var svg = document.getElementById('topo');
  var dot = document.getElementById('packet');
  if (!svg || !dot) return;
  var paths = svg.querySelectorAll('.link');
  var nodes = svg.querySelectorAll('.node');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm) { nodes.forEach(function (n) { n.classList.add('lit'); }); return; }

  // One packet visits each vendor node in turn on page load, then stops.
  var i = 0;
  function next() {
    if (i >= paths.length) { dot.style.display = 'none'; return; }
    var p = paths[i], len = p.getTotalLength(), t0 = performance.now(), dur = 850;
    function step(now) {
      var k = Math.min((now - t0) / dur, 1), pt = p.getPointAtLength(len * k);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
      if (k < 1) { requestAnimationFrame(step); }
      else { nodes[i].classList.add('lit'); i++; setTimeout(next, 120); }
    }
    requestAnimationFrame(step);
  }
  setTimeout(next, 400);
})();
