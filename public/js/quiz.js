const app = new PIXI.Application({
  width: 800, // Width of the canvas
  height: 600, // Height of the canvas
  backgroundColor: 0x1099bb, // Background color
});
document.body.appendChild(app.view);
// Load Assets
PIXI.Loader.shared
  .add('pokemonSprite', 'pokePortal/public/assets/pokemons/bulbasaur.gif')
  .load(setup)
  .on('error', (error) => console.error('Error loading sprite:', error));
function setup(loader, resources) {
  const sprite = new PIXI.Sprite(resources.pokemonSprite.texture);
  sprite.x = app.renderer.width / 2;
  sprite.y = app.renderer.height / 2;
  sprite.anchor.set(0.5); // Center the sprite's anchor point
  app.stage.addChild(sprite);
  // Add animation to the sprite
  app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta; // Rotate the sprite
  });
  // Make the sprite interactive
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.on('pointerdown', () => {
    console.log('Sprite clicked!');
  });
}
// Frontend logic for quiz page
// Event listeners when form is submitted, fetch post request to /api/quiz etc.
// Once submitted, go back to profile
async function submitQuizAnswers(answers) {
try {
  const response = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Error submitting answers', error);
}
}
const quizAnswers = ['answer1', 'answer2'];
submitQuizAnswers(quizAnswers);