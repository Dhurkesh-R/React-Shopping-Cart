import {Button, Container, Navbar, Modal} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";

function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm" bg="dark" variant='dark'>
                <Container>
                    <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => {
                                const productData = getProductData(currentProduct.id);
                                return (
                                    <div key={idx} className="d-flex align-items-center mb-3 border-bottom pb-2">
                                        <img
                                            src={productData.image}
                                            alt={productData.title}
                                            style={{ width: '50px', height: '50px', marginRight: '15px' }}
                                        />
                                        <div className="flex-grow-1">
                                            <p className="mb-1 font-weight-bold">{productData.title}</p>
                                            <p className="mb-0 text-muted">Price: ${productData.price.toFixed(2)}</p>
                                            <p className="mb-0 text-muted">Quantity: {currentProduct.quantity}</p>
                                        </div>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => cart.deleteFromCart(currentProduct.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                );
                            })}

                            <h2 className="mt-3">Total: ${cart.getTotalCost().toFixed(2)}</h2>
                            <Button variant="success" onClick={checkout} className="mt-2">
                                Purchase items!
                            </Button>
                        </>
                    ) : (
                        <h1>There are no items in your cart!</h1>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;