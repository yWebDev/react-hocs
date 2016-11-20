export default function (word) {
  return fetch(`https://crossorigin.me/https://glosbe.com/gapi/translate?from=eng&dest=rus&format=json&phrase=${word}&pretty=true&pageSize=1`)
    .then(data => data.json(), err => {
      throw new Error(err);
    });
}
