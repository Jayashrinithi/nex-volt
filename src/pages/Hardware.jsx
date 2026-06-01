<Route
  path="/hardware"
  element={
    <ProtectedRoute>
      <Hardware />
    </ProtectedRoute>
  }
/>
const wiring = [
  ["Voltage Sensor", "ESP32 GPIO 34", "Analog input"],
  ["Current Sensor", "ESP32 GPIO 35", "Analog input"],
  ["Water Flow Sensor", "ESP32 GPIO 27", "Pulse input"],
  ["Water Level Sensor", "ESP32 GPIO 32", "Analog input"],
  ["Relay", "ESP32 GPIO 26", "Digital output"],
];