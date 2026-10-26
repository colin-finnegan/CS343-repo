/**
 * STEP ONE: Make an initial request and pass the data to be redrawn.
 *
 * Initialization routine. When the page loads, use fetch to send the default
 * query below and retrieve the response as a text Promise. When the Promised
 * is fulfilled, use processJSON to do some processing work and pass the
 * results of that to the redraw function.    
 *
 * STEP TWO: Add a submit event listener to the #queryForm. In the event
 * listener, start by calling preventDefault on the event to prevent the
 * page from reloading. Next, you'll need to get the country code from the
 * text box in the form. You'll also need to merge the start and end dates
 * as the form 1960:2023. Pass both as arguments to runQuery.
 *
 * STEP THREE: Instead of passing the arguments to runQuery, the click
 * event listener will use validateForm to get a Promise that checks the
 * form values. If the Promise resolves, pass the result to runQuery.
 * If the Promise is rejected, use catch to get the error message; put
 * the error message in the #metadata field, remove that element's
 * "text-muted" class, and add the "text-danger" class to make the text red.
 */
(function() {
  const url = 'http://api.worldbank.org/v2/countries/USA/indicators/SP.POP.TOTL?per_page=100&format=json';

  // TODO: Your code here
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const processed = processJSON(json);
      if (processed) {
        redraw(processed);
      }
    });

  document.getElementById('queryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm()
      .then(([country, dates]) => runQuery(country, dates))
      .catch(error => {
        const metadata = document.querySelector('#metadata');
        metadata.classList.remove('text-muted');
        metadata.classList.add('text-danger');
        metadata.innerText = error;
      });
  })
})();

/**
 * STEP THREE: Create and return a Promise that resolves once the form contents
 * have been validated.
 *
 * The form contains three <input> text boxes. The first one must contain one
 * of the countries in the countries.json file. The other two are years that
 * must be between 1960 and 2023. The end date must also be less than the start
 * date. If those conditions hold, the Promise will resolve with a new array
 * containing [ country.id, dateRange ], where country.id is the corresponding
 * country code in countries.json and dateRange is of the form 1960:2023. If
 * any condition does not hold, the Promise should reject with an error message.
 *
 * @return {Promise} A new Promise object based on the description above.
 */
function validateForm() {
  return new Promise((resolve, reject) => {
    const countryInput = document.getElementById('countrySelect').value.trim();
    const startDate = parseInt(document.getElementById('startDateSelect').value);
    const endDate = parseInt(document.getElementById('endDateSelect').value);

    if (isNaN(startDate)) reject('Start date must be a number');
    else if (isNaN(endDate)) reject('End date must be a number');
    else if (startDate < 1960 || startDate > 2023) reject('Start date must be between 1960 and 2023');
    else if (endDate < 1960 || endDate > 2023) reject('End date must be between 1960 and 2023');
    else if (startDate > endDate) reject('Start date must be before end date');
    else {
      fetch('https://w3.cs.jmu.edu/kirkpams/343/labs/lab8/countries.json')
        .then(response => response.json())
        .then(countries => {
          const foundCountry = countries.find(c => 
            c.name.toLowerCase() === countryInput.toLowerCase()
          );
          if (foundCountry) resolve([foundCountry.id, `${startDate}:${endDate}`]);
          else reject('Country not found');
        })
        .catch(() => reject('Error validating country'));
    }
  });
}

/**
 * STEP ONE: Process the raw JSON data and return the object needed to redraw.
 *
 * Given a JSON string, use JSON.parse to convert it to an object. Then extract
 * just the fields needed. Open the following URL in a browser to see the JSON
 * structure provided by worldbank.org:
 *   http://api.worldbank.org/v2/countries/USA/indicators/SP.POP.TOTL?format=json
 * The return value should be an object defined as follows:
 *   item.numberOfRows = the "total" field from the first row of data
 *   item.lastUpdated = the "lastupdated" field from the first row of data
 *   item.country = the country "id" field in each of the data rows
 *   item.entries = an array of objects constructed from each of the data rows:
 *     item.entries[i].year = the "date" field of the data row
 *     item.entries[i].population = the "value" field from the data row
 * If any errors occur (such as a failure of JSON.parse), return undefined.
 * @param {string} data A string of JSON data from worldbank.org.
 */
function processJSON(json) {
  if (!json || !json[1]) return undefined;
  
  return {
    numberOfRows: json[0].total,
    lastUpdated: json[0].lastupdated,
    country: json[1][0].country.id,
    entries: json[1].map(item => ({
      year: item.date,
      population: item.value
    }))
  };
}

/**
 * STEP TWO: Run a custom query and process the result.
 *
 * Modify the URL template shown at the top to run a new query. Replace the
 * "USA" part of the string with the country code passed as a parameter.
 * Similarly, replace the date range to look like "&date=1980:2000" (start date
 * is 1980, end date is 2000). Send the URL request and handle the response.
 * Pass the processed JSON data to be redrawn.
 *
 * @param {string} country One of the country codes in countries.json.
 * @param {string} dates A date range of the form 1960:2023.
 */
function runQuery(country, dates) {
  const url = `http://api.worldbank.org/v2/countries/${country}/indicators/SP.POP.TOTL?per_page=100&format=json&date=${dates}`;
  
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const processed = processJSON(json);
      if (processed) redraw(processed);
    })
    .catch(() => {
      const metadata = document.querySelector('#metadata');
      metadata.classList.remove('text-muted');
      metadata.classList.add('text-danger');
      metadata.innerText = 'Error fetching data';
    });
}


/* ******************************************* *
 * Helper functions below. Do not modify these *
 * ******************************************* */
/**
 * Given the processed JSON string and the time measurement, update the page.
 * @param {object} json The processed JSON object containing the following
 *        fields:
 *         .numberOfRows = the number of query result rows
 *         .lastUpdated = when the query was last updated
 *         .country = the country name
 *         .entries = an array of objects constructed from each of the data rows:
 *           .entries[i].year = the "date" field of the data row
 *           .entries[i].population = the "value" field from the data row
 */
function redraw(json) {
  const list = document.querySelector('#listData');
	for (let child of Array.from(list.children)) {
		child.remove();
	}
  const title = document.querySelector('#tableHeader');
  title.textContent = json.country;
	const metadata = document.querySelector('#metadata');
  metadata.classList.remove('text-danger');
  metadata.classList.add('text-muted');
  metadata.innerText = 'Number of rows: ' + json.numberOfRows +
    '; last updated: ' + json.lastUpdated;

	// Put this in a function
  json.entries.forEach(entry => {
    const entryItem = document.createElement('li');
    entryItem.classList.add('list-group-item', 'py-0');
    list.append(entryItem);
    const entryRow = document.createElement('div');
    entryRow.classList.add('row');
    entryItem.append(entryRow);
    const entryYear = document.createElement('div');
    entryRow.append(entryYear);
    entryYear.classList.add('col-4', 'border-right', 'text-center');
    entryYear.innerText = entry.year;
    const entryData = document.createElement('div');
    entryRow.append(entryData);
    entryData.classList.add('col', 'text-center');
    if (entry.population !== null) {
      entryData.textContent = formatNumberCommas(entry.population);
    } else {
      entryData.textContent = 'No data';
    }
  });
}

/**
 * I can't believe this is necessary, but JavaScript provides no native way to
 * format a number with commas (i.e., 10,324 instead of 10324).
 */
function formatNumberCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

