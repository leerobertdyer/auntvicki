import './MerchItem.css'

interface IcartItem {
    name: string,
    quantity: number,
    price: number,
    photo: string
}

interface MerchItemProps {
    product: IcartItem,
    handleQuantity: (type: string, item: IcartItem) => void,
}

const MerchItem: React.FC<MerchItemProps> = ({ product, handleQuantity }) => {
    return (<>
        <div className="mainMerchItemDiv">
            <div className='merchImageDiv'>
            <img src={product.photo} alt={product.name} className='merchImage'/>
            </div>
            <div className='titleAndBtns'>
            <h1 className='merchItemName'>{product.name}</h1>
            <div className="merchItemBtnDiv">
                <p className='merchItemQuantity'>{product.quantity}</p>
                <button className="merchItemBtn blue" onClick={() => handleQuantity("-", product)}>-</button>
                <button className="merchItemBtn green" onClick={() => handleQuantity("+", product)}>+</button>
                <button className="merchItemBtn red" onClick={() => handleQuantity("REMOVE", product)}>Remove</button>
            </div>
            </div>
        </div>
    </>
    )
}

export default MerchItem