window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const angleSlider = document.getElementById('angle-slider');
    const drawButton = document.getElementById('draw-button');

    canvas.width = window.innerWidth * .67;
    canvas.height = window.innerHeight * .67;

    function drawLine(x1, y1, x2, y2, color, lineWidth) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth * .5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      function drawTree(x1, y1, angle, depth, currentDepth) {
        if (depth === 0) return;
      
        const x2 = x1 + Math.cos(angle) * depth * 10;
        const y2 = y1 + Math.sin(angle) * depth * 10;
      
        drawLine(x1, y1, x2, y2, 'brown', currentDepth / depth * 10);
      
        const newAngle = angle - (Math.PI / 180) * angleSlider.value;
      
        // Add a timeout to draw the left branch
        setTimeout(() => {
          drawTree(x2, y2, newAngle, depth - 1);
        }, 700);
      
        // Add a timeout to draw the right branch
        setTimeout(() => {
          drawTree(x2, y2, angle + (Math.PI / 180) * angleSlider.value, depth - 1);
        }, 700);
      
        // Draw the straight branch
        const straightAngle = angle - (Math.PI / 180);
        const straightX = x2 + Math.cos(straightAngle) * (depth * 0.5) * 10;
        const straightY = y2 + Math.sin(straightAngle) * (depth * 0.5) * 10;
      
        drawLine(x2, y2, straightX, straightY, 'brown', currentDepth / depth * 10);
      
        setTimeout(() => {
          drawTree(straightX, straightY, angle, depth - 1);
        }, 700);
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(canvas.width / 2, canvas.height - 50, -Math.PI / 2, 8, 2);
      }

      function onDrawButtonClick() {
        draw();
      }
    //   angleSlider.addEventListener('input', draw);
      drawButton.addEventListener('click', onDrawButtonClick);
      draw();
});
