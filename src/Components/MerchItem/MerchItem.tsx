import './MerchItem.css'

interface IcartItem {
    name: string,
    quantity: number,
    price: number,
    photo: string
}

interface MerchItemProps {
    product: IcartItem,
    addToCart: (item: IcartItem) => void,
}

const MerchItem: React.FC<MerchItemProps> = ({ product, addToCart }) => {
    return (<>
        <div className="mainMerchItemDiv">
            <div className='merchImageDiv'>
            <img src={product.photo} alt={product.name} className='merchImage'/>
            </div>
            <div className='titleAndBtns'>
            <h1 className='merchItemName'>{product.name}</h1>
            <div className="merchItemBtnDiv">
                <button className="merchItemBtn" onClick={() => addToCart(product)} onTouchStart={() => addToCart(product)} >Add To Cart</button>
            </div>
            </div>
        </div>
    </>
    )
}

export default MerchItem