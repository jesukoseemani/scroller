// Create global scope variables for our data
let profiles;
let userData;
 
// Setup page
pageInit();
 
// Wrapping this in an async function allows us to manage the dependencies between async API fetches
async function pageInit() {
	// Generate a random set of user details
	let userData = await getRandomPeople(50);
 
	// Instantiate our profile iterator with our user data
	profiles = profileIterator(userData);
 
	// Load first profile so page isn't blank on load
	nextProfile();
 
	// Next button event handler
	document.getElementById('next').addEventListener('click', nextProfile);
}
 
// Display next profile
async function nextProfile() {
	const currentProfile = profiles.next().value;
 
	// If we have a profile then populate the user details
	if (currentProfile !== undefined) {
		// Generate a random preference
		console.log(Math.random());
		let x = Math.random();
		if (currentProfile.gender === 'male') {
			preference = x > 0.9 ? 'male' : 'female';
		} else {
			preference = x > 0.9 ? 'female' : 'male';
		}
 
		document.getElementById('profiledisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">User: ${currentProfile.name.first} ${currentProfile.name.last}</li>
      <li class="list-group-item">Age: ${currentProfile.dob.age}</li>
      <li class="list-group-item">Gender: ${currentProfile.gender}</li>
      <li class="list-group-item">Looking For: ${preference}</li>
      <li class="list-group-item">Location: ${currentProfile.location.city}, ${currentProfile.location.country}</li>
    </ul>
  `;
	} else {
		// No more profiles so reload to reset the iterator with new data
		window.location.reload();
	}
	// Check the returned age so we can request an appropriate image
	let faceAge;
 
	if (currentProfile.dob.age < 25) {
		faceAge = 'young-adult';
	} else if (currentProfile.dob.age >= 25 && currentProfile.dob.age < 60) {
		faceAge = 'adult';
	} else {
		faceAge = 'elderly';
	}
 
	// Get random happy image from Generated Photos API
	const apiKey = '<APIKEY';
 
	// Wait for the image to be returned
	let response = await fetch(
		`https://api.generated.photos/api/v1/faces?gender=${currentProfile.gender}&emotion=joy&age=${faceAge}&order_by=random&per_page=1&api_key=${apiKey}`
	);
 
	// Parse out the JSON response
	let imageData = await response.json();
 
	// Display the image in our imagedisplay div
	document.getElementById('imagedisplay').innerHTML = `
	  <img src="${imageData['faces']['0']['urls']['3']['256']}">
	`;
}
 
// Create our random user profiles
async function getRandomPeople(number) {
	// Wait for our profiles to be returned
	let response = await fetch(
		`https://randomuser.me/api/?results=${number}&inc=name,gender,location,dob`
	);
 
	// Parse out the JSON response
	let userData = await response.json();
 
	// Return our random profiles
	return userData;
}
 
// Profile iterator
function profileIterator(profiles) {
	let nextIndex = 0;
 
	// Return the next profile from our user data (or done if there are no more)
	return {
		next: function () {
			return nextIndex < profiles.results.length
				? { value: profiles.results[nextIndex++], done: false }
				: { done: true };
		},
	};
}