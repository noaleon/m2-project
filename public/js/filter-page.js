function onSelectChange(event) {
  console.log(event.target.value);
  document.location.search = 'filter=' + event.target.value;
}
