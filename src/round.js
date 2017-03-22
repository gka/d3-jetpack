export default function(n, p) {
  return p ? Math.round(n * (p = Math.pow(10, p))) / p : Math.round(n);
}
