export const loadPosts = async () => {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');

    const [postsPromise, photosPromise] = await
        Promise.all([postsResponse, photosResponse])

    const postsJson = await postsPromise.json();
    const photosJson = await photosPromise.json();

    const newUrlPhotos = photosJson.map(photo => {
        return photo.url.replace('https://via.placeholder.com', 'https://placehold.co').concat('/png');
    });

    const postsAndPhotos = postsJson.map((post, index) => {
        return {
            ...post,
            cover: newUrlPhotos[index]
        }
    })
    return postsAndPhotos;
}