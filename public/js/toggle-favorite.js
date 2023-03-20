function toggleFavorite(e) {
  const projectId = e.currentTarget.dataset.id;

  fetch('/users/projects/favorites', {
    method: 'post',
    body: JSON.stringify({ projectId }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    const image = e.target;

    console.log(image);

    if (response.status === 201) {
      image.src = '/images/star-green.svg';
    } else if (response.status === 200) {
      image.src = '/images/star-outline-green.svg';
    }
  });
}
