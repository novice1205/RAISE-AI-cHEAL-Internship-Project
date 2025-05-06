export const drawMesh = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  predictions.forEach(prediction => {
    const keypoints = prediction.scaledMesh;

    ctx.beginPath();
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 1;

    keypoints.forEach(point => {
      const [x, y] = point;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    });

    ctx.stroke();
  });
};
