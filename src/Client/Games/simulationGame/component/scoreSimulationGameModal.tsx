import React from "react";
import { Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Summary from "../schema/summary.schema";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface ScoreSimulationGameProp {
  summary: Summary | undefined;
}

function ScoreSimulationGameModel({ summary }: ScoreSimulationGameProp) {
  const handleBackToSelectGame = () => {
    window.location.href = "/games";
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white">
        <div className="flex flex-col items-center space-y-10">
          <div className="flex flex-col items-center space-y-3">
            <video
              autoPlay
              controls
              muted
              loop
              className="w-[80%] h-auto"
              src={summary?.video}
            />
            <span className="text-gray-700 text-sm md:text-lg">
              คำอธิบาย: {summary?.description}
            </span>
          </div>
          <div className="w-[100%]">
            <MDBTable className="border-2">
              <MDBTableHead>
                <tr className="flex justify-between">
                  <th className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                      คำตอบของคุณ
                    </h1>
                  </th>
                  <th className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                      เฉลย
                    </h1>
                  </th>
                  <th className="w-[30%] flex justify-center text-sm md:text-lg">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600">
                      สถานะ
                    </h1>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {summary && (
                  <>
                    <tr className="flex justify-between">
                      <td className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                        <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                          {summary.select_A}
                        </h1>
                      </td>
                      <td className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                        <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                          {summary.answer_A}
                        </h1>
                      </td>
                      <td className="w-[30%] flex justify-center text-sm md:text-lg">
                        {summary.status_A === "ถูก" ? (
                          <div className="p-2 border-3 border-green-700 rounded-full bg-green-500">
                            <CheckIcon className="text-white" />
                          </div>
                        ) : (
                          <div className="p-2 border-3 border-red-700 rounded-full bg-red-500">
                            <ClearIcon className="text-white" />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr className="flex justify-between">
                      <td className="w-[40%] flex justify-center border-r-2 text-sm md:text-lg">
                        <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                          {summary.select_B}
                        </h1>
                      </td>
                      <td className="w-[30%] flex justify-center border-r-2 text-sm md:text-lg">
                        <h1 className="text-lg md:text-2xl lg:text-3xl text-gray-600">
                          {summary.answer_B}
                        </h1>
                      </td>
                      <td className="w-[30%] flex justify-center text-sm md:text-lg">
                        {summary.status_B === "ถูก" ? (
                          <div className="p-2 border-3 border-green-700 rounded-full bg-green-500">
                            <CheckIcon className="text-white" />
                          </div>
                        ) : (
                          <div className="p-2 border-3 border-red-700 rounded-full bg-red-500">
                            <ClearIcon className="text-white" />
                          </div>
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>

        <div className="flex items-center justify-end py-4 space-x-4">
          <Button onClick={handleBackToSelectGame} className="btn-danger">
            กลับ
          </Button>
          <Button onClick={handlePlayAgain} className="btn-primary">
            เล่นอีกครั้ง
          </Button>
        </div>
      </div>
    </>
  );
}

export default ScoreSimulationGameModel;
