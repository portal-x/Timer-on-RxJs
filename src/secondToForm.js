const formatsTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

export default formatsTime;
