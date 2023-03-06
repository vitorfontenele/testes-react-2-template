import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import ProductCard from "../components/ProductsList/ProductCard";

const productMock = {
    id: 1,
    title: "T-shirt",
    image: "http://www.tshirtmock.com",
    price: 22.99
}

const addToCartMock = jest.fn();
const keyMock = productMock.id;

describe("Product Card", () => {
    test("deve renderizar com as props", async () => {
        render(<ProductCard 
            product={productMock}  
            addToCart={addToCartMock}
            key={keyMock}
        />)

        const title = screen.getByRole("heading", {name: /t-shirt/i})
        const price = screen.getByText("$22.99");
        const image = screen.getByRole("img", {name: /t-shirt/i});
        const buy = screen.getByRole("button", {name: /buy/i});
        
        const user = userEvent.setup();

        await user.click(buy);

        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(buy).toBeInTheDocument();
        expect(addToCartMock).toHaveBeenCalled();
        expect(addToCartMock).toBeCalledWith(productMock);
    })
})