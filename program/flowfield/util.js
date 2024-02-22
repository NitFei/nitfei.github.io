dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

magnitude = (vec) => {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
};

vecAdd = (vec1, vec2) => {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
};

vecSub = (vec1, vec2) => {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
};

vecDiv = (vec, scalar) => {
  return [vec[0] / scalar, vec[1] / scalar];
};

vecMult = (vec, scalar) => {
  return [vec[0] * scalar, vec[1] * scalar];
};

normalize = (vec) => {
  const mag = magnitude(vec);
  let normalized = vecDiv(vec, mag);
  return normalized;
};

setMag = (vec, mag) => {
  let newVec = normalize(vec);
  return vecMult(newVec, mag);
};
