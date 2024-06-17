import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface OwnerProps {
  label1?: string | number;
  label2?: string;
  label3?: string;
  label4?: string | ReactNode;
  label5?: number | string;
  label6?: number | string;
  id: string;
  activate?: () => void;
  unActivate?: () => void;
  delete?: () => void; // Ensure delete prop is of type void
  view?: () => void;
  viewProofIdentifier?: (url: string) => void;
}

const OwnerRow: React.FC<OwnerProps> = (props) => {
  const {
    label1,
    label2,
    label3,
    label4,
    label5,
    label6,
    id,
    activate,
    unActivate,
    delete: deleteOwner,
    view,
    viewProofIdentifier,
  } = props;

  const handleViewProofClick = () => {
    if (viewProofIdentifier && label3) {
      viewProofIdentifier(label3);
    }
  };

  const handleDelete = () => {
    if (deleteOwner) {
      deleteOwner(); // Invoke delete function passed from props
    }
  };

  return (
    <tr>
      <td className="px-4 py-2">{label1}</td>
      <td className="px-4 py-2">{label2}</td>
      <td className="px-4 py-2">
        {label3 && (
          <a href="#" onClick={handleViewProofClick}>
            View Proof
          </a>
        )}
      </td>
      <td className="px-4 py-2">{label4}</td>
      <td className="px-4 py-2">{label5}</td>
      <td className="px-4 py-2">{label6}</td>
      <td className="px-4 py-2 flex gap-2">
        {activate && (
          <>
            <button
              onClick={activate}
              className="hover:bg-blue-600 bg-blue-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
            >
              Activate
            </button>
            <button
              onClick={unActivate}
              className="hover:bg-red-600 bg-red-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
            >
              UnActivate
            </button>
          </>
        )}
        {deleteOwner && (
          <button
            onClick={handleDelete}
            className="hover:bg-red-600 bg-red-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
          >
            Delete
          </button>
        )}
        {view && (
          <Link to={`/owner/${id}`}>
            <button
              onClick={view}
              className="hover:bg-blue-600 bg-blue-500 text-white font-bold cursor-pointer px-3 py-2 rounded"
            >
              View
            </button>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default OwnerRow;
