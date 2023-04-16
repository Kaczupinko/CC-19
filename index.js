import './style.css';
import { Howl, Howler } from 'howler';

const images = {
    treasure: '💰',
    leafs: '🍃'
}

//Ustawianie niestandardowego alarmu na 2 sekundy.
function showAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 2000);
}

//Obsluguj zdarzenie najechania kursorem myszy na skarb.
function handleTreasureMouseover(tree, soundPlayed) {
    if (!soundPlayed) {
        const sound = new Howl({
            src: ['https://archive.org/download/SuperMarioBros.ThemeMusic/SuperMarioBros.ogg']
        });
        sound.play();
        setTimeout(() => {
            sound.stop();
        }, 4000);
        showAlert();
    }
    tree.textContent = images.treasure;
    return true;
}

// Obsluguj zdarzenie najechania myszka na liscie.
function handleLeafMouseover(tree) {
    tree.textContent = images.leafs;
}

// Zainicjuj gre w poszukiwanie skarbow.
function initTreasureHunt() {
    const trees = document.querySelectorAll('.tree');

    // Losowo przypisz skarb do jednego z drzew
    const treasureIndex = Math.floor(Math.random() * trees.length);
    trees[treasureIndex].classList.add('treasure');

    let soundPlayed = false;

    // Dodaj detektory zdarzen mouseover do wszystkich drzew.
    trees.forEach(tree => {
        tree.addEventListener('mouseover', () => {
            if (tree.classList.contains('treasure')) {
                soundPlayed = handleTreasureMouseover(tree, soundPlayed);
            } else {
                handleLeafMouseover(tree);
            }
        });
    });
}

initTreasureHunt();