const dailyBtn = document.getElementById('daily-btn');
const weeklyBtn = document.getElementById('weekly-btn');
const monthlyBtn = document.getElementById('monthly-btn');

function updateSelectedButton(selectedBtn) {

    dailyBtn.classList.remove('selected');
    weeklyBtn.classList.remove('selected');
    monthlyBtn.classList.remove('selected');
    
    selectedBtn.classList.add('selected');
}

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      defaultTimeframe(data, 'weekly');
      updateSelectedButton(weeklyBtn);

      dailyBtn.addEventListener('click', () => {
        defaultTimeframe(data, 'daily');
        updateSelectedButton(dailyBtn);
      });

      weeklyBtn.addEventListener('click', () => {
        defaultTimeframe(data, 'weekly');
        updateSelectedButton(weeklyBtn);
      });

      monthlyBtn.addEventListener('click', () => {
        defaultTimeframe(data, 'monthly');
        updateSelectedButton(monthlyBtn);
      });
    }
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });

function defaultTimeframe(data, timeframe) {
  data.forEach((item) => {
    const title = item.title.toLowerCase().replace(" ", "-");

    const currentHours = item.timeframes[timeframe].current;
    const previousHours = item.timeframes[timeframe].previous;

    const section = document.querySelector(`.${title}-section`);

    if (section) {
      const currentSpan = section.querySelector('.current-span');
      const previousSpan = section.querySelector('.previous-span');

      if (currentSpan && previousSpan) {
        let formattedTimeframe;
        switch (timeframe) {
          case 'daily':
            formattedTimeframe = 'Yesterday';
            break;
          case 'weekly':
            formattedTimeframe = 'Last Week';
            break;
          case 'monthly':
            formattedTimeframe = 'Last Month';
            break;
        }

        currentSpan.textContent = `${currentHours}hrs`;
        previousSpan.textContent = `${formattedTimeframe} - ${previousHours}hrs`;
      }
    }
  });
}