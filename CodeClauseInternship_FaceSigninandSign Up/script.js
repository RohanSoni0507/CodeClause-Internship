const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const signupButton = document.getElementById('signup-button');
const videoSignin = document.getElementById('video-signin');
const canvasSignin = document.getElementById('canvas-signin');
const signinButton = document.getElementById('signin-button');

navigator.getUserMedia(
    { video: {} },
    (stream) => {
        video.srcObject = stream;
        videoSignin.srcObject = stream;
    },
    (err) => console.error(err)
);

signupButton.addEventListener('click', async () => {
    // Capture a snapshot from the video stream
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to base64 data (simulate facial data)
    const facialData = canvas.toDataURL('image/jpeg');

    // Send the facial data to the server for signup
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'user1', facialData }),
    });

    const data = await response.json();
    console.log(data);
});

signinButton.addEventListener('click', async () => {
    // Capture a snapshot from the video stream for sign-in
    const ctxSignin = canvasSignin.getContext('2d');
    ctxSignin.drawImage(videoSignin, 0, 0, canvasSignin.width, canvasSignin.height);

    // Convert the canvas image to base64 data (simulate facial data)
    const facialDataSignin = canvasSignin.toDataURL('image/jpeg');

    // Send the facial data to the server for sign-in
    const responseSignin = await fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'user1', facialData: facialDataSignin }),
    });

    const dataSignin = await responseSignin.json();
    console.log(dataSignin);
});
