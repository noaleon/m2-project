function onSelectChange(event) {
  console.log(event.target.value);
  fetch(`/projects/filters?filter=${event.target.value}`)
    .then((response) => {
      return response.json();
    })

    .catch((error) => console.error(error));
}
