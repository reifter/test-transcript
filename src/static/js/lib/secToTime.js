const secToTime = (sec) => {
  const dateStr = new Date(sec * 1000).toISOString();
  return (sec >= 3600) ? dateStr.substr(11, 8) : dateStr.substr(14, 5);
};

export default secToTime;
