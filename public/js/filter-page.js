function onSelectChange(event) {
  console.log(event.target.value);
  fetch(`/projects/explore?filter=${event.target.value}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
    })

    .catch((error) => console.error(error));
}
