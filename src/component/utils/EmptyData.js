
import "./emptyData.css";
import FolderIcon from '@mui/icons-material/Folder';

const EmptyData = () => {
    return (
        <div className="empty-container">
            <FolderIcon color="primary" fontSize="large" />
            <div className="heading">No Data</div>
            <div className="subtitle">There is not student data available currently. please add student data by clicking on <span className="plus-sign">+</span> icon.</div>
        </div>
    )
}

export default EmptyData