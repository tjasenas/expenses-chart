'use strict';

(async function() {
    try {
        const spendingBars = document.querySelector('.spendings__bars');
        const date = new Date();
        const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const allstats = await fetch('./data.json');
        const statsArr = await allstats.json();
        const arr = [];

        statsArr.forEach((el, i )=> {
                const html = `  
                <div class="day ${weekDays[date.getDay() - 1] === el.day ? 'current-day': ''}">
                    <div class="day__column"></div>
                    <div class="day__name">${el.day}</div>
                    <div class="day__amount">$${el.amount}</div>
                </div>`;
                spendingBars.insertAdjacentHTML('beforeend',html);
                arr.push(el.amount);
        });

        const dayColumns = document.querySelectorAll('.day__column');
        let count = 0;

        const int = setInterval(() => {
            dayColumns[count].style.height = `${arr[count] * 2}px`;
            count++;
            if(count === dayColumns.length ) clearInterval(int);
        } , 100)
        
    }  catch(error) {
        console.error(error);
    }
})();

