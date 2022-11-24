export const calcReadingTime = (body) => {
  const minWpm = 200;
  const maxWpm = 250;
  const words = body.trim().split(/\s+/).length;
  const minEstimated = words / minWpm;
  const maxEstimated = words / maxWpm;
  return Math.ceil(minEstimated + maxEstimated);
};
