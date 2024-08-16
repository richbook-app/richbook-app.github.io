import { VidstackPlayer, VidstackPlayerLayout } from 'https://cdn.vidstack.io/player';

const player = await VidstackPlayer.create({
    target: '#target',
    title: '@(Model.Material.Title)',
    src: 'https://www.youtube.com/watch?v=H14bBuluwB8',
    posterLoad: "visible",
    poster: 'https://img.youtube.com/vi/H14bBuluwB8/mqdefault.jpg',
    layout: new VidstackPlayerLayout({
        displayDuration: false
    })
});
disablePlayerControls();
function disablePlayerControls() {
    const myDiv = document.querySelector('#target media-player');
    disableAllEvents(myDiv);
}