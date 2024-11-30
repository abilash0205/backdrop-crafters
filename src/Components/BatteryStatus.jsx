import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BatteryStatus = () => {
  const [batteryInfo, setBatteryInfo] = useState({
    level: "-",
    charging: "-",
    chargingTime: "-",
    dischargingTime: "-",
    statusMessage: "Fetching battery information...",
  });

  useEffect(() => {
    let isMounted = true;

    const updateBatteryInfo = (batteryInstance) => {
      const level = batteryInstance.level;
      if (typeof level === "number") {
        setBatteryInfo({
          level: `${Math.round(level * 100)}%`,
          charging: batteryInstance.charging ? "Yes" : "No",
          chargingTime: batteryInstance.charging
            ? batteryInstance.chargingTime
            : "-",
          dischargingTime: batteryInstance.dischargingTime,
          statusMessage:
            level < 0.1
              ? "Battery is low on health. Please connect your charger"
              : level > 0.9
              ? "Battery is in perfect condition"
              : "",
        });
      } else {
        setBatteryInfo({
          level: "-",
          charging: "-",
          chargingTime: "-",
          dischargingTime: "-",
          statusMessage: "Battery information not available yet.",
        });
      }
    };

    const fetchBatteryInfo = async () => {
      try {
        const batteryInstance = await navigator.getBattery();

        if (isMounted) {
          updateBatteryInfo(batteryInstance);

          batteryInstance.addEventListener("chargingchange", () =>
            updateBatteryInfo(batteryInstance)
          );
          batteryInstance.addEventListener("chargingtimechange", () =>
            updateBatteryInfo(batteryInstance)
          );
          batteryInstance.addEventListener("dischargingtimechange", () =>
            updateBatteryInfo(batteryInstance)
          );
          batteryInstance.addEventListener("levelchange", () =>
            updateBatteryInfo(batteryInstance)
          );
        }
      } catch (error) {
        console.error("Error fetching battery information:", error);
        setBatteryInfo({
          level: "-",
          charging: "-",
          chargingTime: "-",
          dischargingTime: "-",
          statusMessage: "Error fetching battery information.",
        });
      }
    };

    fetchBatteryInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <p className="text-xl text-center p-3">Fetching battery status using the In-Built web browser Battery API</p>
      <TableContainer component={Paper} className="max-w-[500px] mt-5 mx-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Battery Level</TableCell>
              <TableCell>{batteryInfo.level}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Charging Status</TableCell>
              <TableCell>{batteryInfo.charging}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Charging Time</TableCell>
              <TableCell>{batteryInfo.chargingTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discharging Time</TableCell>
              <TableCell>{batteryInfo.dischargingTime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <p className="battery-status-message text-center">
        {batteryInfo.statusMessage}
      </p>
    </div>
  );
};

export default BatteryStatus;
