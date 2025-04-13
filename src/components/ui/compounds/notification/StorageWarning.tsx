import { FC } from "react";

interface StorageWarningProps { }

const StorageWarning: FC<StorageWarningProps> = () => {
    return (
        <div className="w-full p-3 bg-red-100 rounded flex items-center">
            <div className="w-8 h-8 border rounded-full border-red-200 flex items-center justify-center text-red-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="6" />
                </svg>
            </div>
            <div className="pl-3 w-full flex justify-between">
                <p className="text-sm text-red-700">Low on storage: 2.5/32GB remaining</p>
                <p className="text-xs text-red-700 underline cursor-pointer">Manage</p>
            </div>
        </div>
    );
}

export default StorageWarning;
