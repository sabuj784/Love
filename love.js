let highestZ = 1;
let draggedPapers = 0;
const totalPapers = document.querySelectorAll('.paper').length;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const startDrag = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if (e.type === 'touchstart') {
        this.mouseTouchX = e.touches[0].clientX;
        this.mouseTouchY = e.touches[0].clientY;
      } else {
        this.mouseTouchX = e.clientX;
        this.mouseTouchY = e.clientY;
      }
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;
    };

    const drag = (e) => {
      if (this.holdingPaper) {
        if (!this.rotating) {
          if (e.type === 'touchmove') {
            this.mouseX = e.touches[0].clientX;
            this.mouseY = e.touches[0].clientY;
          } else {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
          }
          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      }
    };

    const endDrag = () => {
      if (this.holdingPaper) {
        draggedPapers++;
        if (draggedPapers === totalPapers) {
          showProposal();
        }
      }
      this.holdingPaper = false;
      this.rotating = false;
    };

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);
    paper.addEventListener('mousedown', startDrag);
    paper.addEventListener('touchstart', startDrag);

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

function showProposal() {
  const existingProposal = document.getElementById('proposal');
  if (existingProposal) {
    existingProposal.remove();
  }

  const proposal = document.createElement('div');
  proposal.id = 'proposal';
  proposal.style.position = 'fixed';
  proposal.style.top = '50%';
  proposal.style.left = '50%';
  proposal.style.transform = 'translate(-50%, -50%)';
  proposal.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  proposal.style.padding = '20px';
  proposal.style.borderRadius = '10px';
  proposal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  proposal.style.textAlign = 'center';
  proposal.style.zIndex = '1000';

  const title = document.createElement('h1');
  title.textContent = 'Will you accept my love?';
  title.style.fontFamily = 'Arial, sans-serif';
  title.style.color = '#e74c3c';
  title.style.fontSize = '24px';
  title.style.marginBottom = '20px';

  const yesBtn = document.createElement('button');
  yesBtn.id = 'yes-btn';
  yesBtn.textContent = 'Yes';
  yesBtn.style.fontFamily = 'Arial, sans-serif';
  yesBtn.style.border = 'none';
  yesBtn.style.padding = '15px 30px';
  yesBtn.style.fontSize = '18px';
  yesBtn.style.color = '#fff';
  yesBtn.style.borderRadius = '5px';
  yesBtn.style.cursor = 'pointer';
  yesBtn.style.backgroundColor = '#2ecc71';
  yesBtn.style.transition = 'background-color 0.3s';
  yesBtn.addEventListener('mouseover', () => {
    yesBtn.style.backgroundColor = '#27ae60';
  });
  yesBtn.addEventListener('mouseout', () => {
    yesBtn.style.backgroundColor = '#2ecc71';
  });
  yesBtn.addEventListener('mousedown', () => {
    yesBtn.style.transform = 'scale(0.95)';
  });
  yesBtn.addEventListener('mouseup', () => {
    yesBtn.style.transform = 'scale(1)';
  });

  const noBtn = document.createElement('button');
  noBtn.id = 'no-btn';
  noBtn.textContent = 'No';
  noBtn.style.fontFamily = 'Arial, sans-serif';
  noBtn.style.border = 'none';
  noBtn.style.padding = '15px 30px';
  noBtn.style.fontSize = '18px';
  noBtn.style.color = '#fff';
  noBtn.style.borderRadius = '5px';
  noBtn.style.cursor = 'pointer';
  noBtn.style.backgroundColor = '#e74c3c';
  noBtn.style.transition = 'background-color 0.3s';
  noBtn.addEventListener('mouseover', () => {
    noBtn.style.backgroundColor = '#c0392b';
  });
  noBtn.addEventListener('mouseout', () => {
    noBtn.style.backgroundColor = '#e74c3c';
  });
  noBtn.addEventListener('mousedown', () => {
    noBtn.style.transform = 'scale(0.95)';
  });
  noBtn.addEventListener('mouseup', () => {
    noBtn.style.transform = 'scale(1)';
  });
  noBtn.addEventListener('click', () => {
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${Math.random() * 80 + 10}%`;
    noBtn.style.top = `${Math.random() * 80 + 10}%`;
  });

  proposal.appendChild(title);
  proposal.appendChild(yesBtn);
  proposal.appendChild(noBtn);

  document.body.appendChild(proposal);

  // Ensure that the "Yes" button has the correct event listener attached
  yesBtn.addEventListener('click', () => {
    var loveMusic = document.getElementById('love-music');
    var yesMusic = document.getElementById('yes-music');
    if (loveMusic) loveMusic.pause();
    if (yesMusic) yesMusic.play();
    // Delay the redirection to ensure the music plays first
    setTimeout(() => {
      window.location.href = 'love.html';
    }, 1000); // Adjust the timeout if needed
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yes-btn');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      var loveMusic = document.getElementById('love-music');
      var yesMusic = document.getElementById('yes-music');
      if (loveMusic) loveMusic.pause();
      if (yesMusic) yesMusic.play();
      // Delay the redirection to ensure the music plays first
      setTimeout(() => {
        window.location.href = 'love.html';
      }, 1000); // Adjust the timeout if needed
    });
  }
});
