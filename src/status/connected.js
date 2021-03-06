import {
  channels
} from '../constants'

export default function connected(observable) {
  return new Promise((resolve, reject) => {
    const handshake = observable
      .filter(x => x.type === channels.Handshake)
      .map(x => JSON.parse(x.payload.toString("utf8")))
      .first()
      .subscribe(x => {
        resolve(x)
      })

    const busy = observable
      .filter(x => x.type === channels.Busy)
      .first()
      .subscribe(x => {
        reject(x)
      })
  });
}
