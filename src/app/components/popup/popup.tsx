
import React from 'react';
import Link from 'next/link';
import "@/app/components/popup/popup.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface UpdateModalProps {
    isSuccess: boolean;
    error: string | null;
    onClose: () => void;
    text1: string;

}

const Popup: React.FC<UpdateModalProps> = ({ isSuccess, error, onClose, text1 }) => (
    <div className="modal">
        <div className={`modalContent ${isSuccess ? '' : 'error'}`}>
            {isSuccess ? (
                <>
                    <CheckCircleIcon className="successicon"/>
                    <p>{text1}</p>

                    <Link href="/employees"><button onClick={onClose}>Close</button></Link>
                </>
            ) : (
                <>
                    <ErrorIcon className="erroricon"/>
                    <p>{error}</p>

                    <Link href="/employees"><button onClick={onClose}>Close</button></Link>
                </>
            )}
        </div>
    </div>
);

export default Popup;
