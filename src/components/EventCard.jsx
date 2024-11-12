import { deleteEvent, setEventId, setEventStatus } from "../services/dbService";

import { FiTrash2 } from "react-icons/fi";
import { formatTime } from "../utils/helpers";
import { baseUrl } from "../config/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { MdOutlineQrCode } from "react-icons/md";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      deleteEvent(event.id);
      toast.success("Event Deleted Successfully!");
      // Proceed with delete action
      console.log("Event deleted");
      // Add your delete logic here, like an API call
    } else {
      // Cancelled
      console.log("Delete action cancelled");
    }
  };

  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = document.getElementById(event.id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = event.id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Function to handle QR code generation and saving as PNG
  // const handleSaveQRCode = () => {
  //   if (qrRef.current) {
  //     toPng(qrRef.current)
  //       .then((dataUrl) => {
  //         const link = document.createElement("a");
  //         link.href = dataUrl;
  //         link.download = `${event.eventName}_QRCode.png`;
  //         link.click();
  //       })
  //       .catch((err) => {
  //         console.error("Error saving QR code image:", err);
  //       });
  //   }
  // };

  const openEvent = () => {
    setEventId(event.id);
    navigate(`/admin/event/${event.id}`);
  };

  const onToggleEvent = () => {
    if (
      window.confirm(
        `Do you want to ${event.isEnded ? "Start" : "Stop"} the Event?`
      )
    ) {
      setEventStatus(!event.isEnded, event.id);
    }
  };
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md flex flex-col border-l-4 border-yellow-400"
      onClick={() => {
        openEvent(event.id);
      }}
    >
      {/* Event Title and Actions */}
      <p className="text-gray-600 text-sm">{formatTime(event.createdAt)}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">
            {event.eventName} ({event.participantCount})&nbsp;
            {!event.isEnded ? "🟢" : "🔴"} -{" "}
            <span
              className="underline cursor-pointer font-thin text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(baseUrl + event.id);
                toast.success(
                  "Event link copied to clipboard! Share this link to participants."
                );
              }}
            >
              {event.id}{" "}
            </span>{" "}
           
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadQR();
              }}
              className="px-4"
            >
              <MdOutlineQrCode />
            </button>
          </h2>
          <div ref={qrRef} className="hidden">
            <QRCodeCanvas id={event.id} value={baseUrl + event.id} size={150} />
          </div>
        </div>
        <div className="space-x-2 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              return onToggleEvent();
            }}
            className={`px-4 py-2 rounded-md ${
              event.isEnded ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {event.isEnded ? "Start" : "Stop"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              return handleDelete();
            }}
            className=" px-3 py-1 rounded-md text-red-500 text-xl"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      {/* Event Description */}
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
};

export default EventCard;
