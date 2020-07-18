import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '30s', target: 300 },
    { duration: '3m', target: 700 },
    { duration: '20s', target: 10 },
  ],
}
export default function() {
  http.get('http://localhost:3002/api/similaritems/?id=3');
  sleep(1);
}