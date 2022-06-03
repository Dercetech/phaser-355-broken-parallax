Simply `npm install` and `npm start`. A browser window will open.

Just use the right key when facing the game to move the "hero" (frog?) to the right and see the parallax happen:

- in blue, the foreground layer (scroll factor: 1)
- in green, the midground layer (scroll factor: 0.5)
- in red, the background layer (scroll factor: 0.25)

The default device width is 320 px.

- Face the blue FG5 square and observe that both mid and back layer are aligned here.

Now, simulate a different device size by modifying the width in `src/main.ts`, say using 512px width:

- The squares are no longer aligned and we notice that the parallax layers are lagging behind.

This is due to the scrollX being smaller on larger screens (less distance between the world's origin and the leftmost end of the displayed area).
