const fs = require("fs");

const sensorData = JSON.parse(fs.readFileSync("sensor_data.json", "utf8"));

function SolveSensorData(data) {
  const mappedData = data.array.map((entry) => {
    const { roomArea, timestamp, temperature, humidity } = entry;
    const date = new Date(timestamp).toLocaleDateString();

    const flatTemperature = Array.isArray(temperature)
      ? temperature
      : [temperature];
    const flatHumidity = Array.isArray(humidity) ? humidity : [humidity];

    const minTemperature = Math.min(...flatTemperature);
    const maxTemperature = Math.max(...flatTemperature);
    const avgTemperature =
      flatTemperature.reduce((acc, val) => acc + val, 0) /
      flatTemperature.length;

    const minHumidity = Math.min(...flatHumidity);
    const maxHumidity = Math.max(...flatHumidity);
    const avgHumidity =
      flatHumidity.reduce((acc, val) => acc + val, 0) / flatHumidity.length;

    return {
      room: roomArea,
      date,
      minTemperature,
      maxTemperature,
      avgTemperature,
      minHumidity,
      maxHumidity,
      avgHumidity,
    };
  });

  return mappedData;
}

const SensorData = SolveSensorData(sensorData);
console.log(JSON.stringify(SensorData, null, 2));
