$(document).ready(function () {

    /* ======= Highlight.js Plugin ======= */
    /* Ref: https://highlightjs.org/usage/ */
    $('p code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

});
function daysPassed1(dateString) {
    if (!dateString) return 0;

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const today = new Date();
    const modelDate = new Date(dateString);

    // Calculate the difference in milliseconds
    const timeDiff = today.getTime() - modelDate.getTime();

    // Convert the difference to days and round down (whole days passed)
    return Math.floor(Math.abs(timeDiff) / oneDay);
}
function daysPassed(dateString) {
    if (!dateString) return { years: 0, months: 0, days: 0 };

    const today = new Date();
    const modelDate = new Date(dateString);

    let years = today.getFullYear() - modelDate.getFullYear();
    let months = today.getMonth() - modelDate.getMonth();
    let days = today.getDate() - modelDate.getDate();

    // Adjust if the current day is before the modelDate day in the month
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Adjust if the current month is before the modelDate month in the year
    if (months < 0) {
        years--;
        months += 12;
    }

    return generateDescription(years, months, days);
}
function generateDescription(years, months, days) {
    let description = "";

    if (years > 0) {
        description += `${years} ${years === 1 ? 'year' : 'years'} `;
    }
    if (months > 0) {
        if (description !== "") description += ", ";
        description += `${months} ${months === 1 ? 'month' : 'months'} `;
    }
    if (days > 0) {
        if (description !== "") description += ", ";
        description += `${days} ${days === 1 ? 'day' : 'days'} `;
    }

    return description.trim() || "Today";
}