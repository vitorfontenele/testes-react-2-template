import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartCard from "../components/Cart/CartCard";

const productMock = {
    id: 1,
    title: "T-shirt",
    image: "http://www.tshirtmock.com",
    price: 22.99,
    quantity: 1
}

const removeFromCartMock = jest.fn();
const keyMock = productMock.id;

describe("Cart Card", () => {
    test("Deve renderizar com as props", async () => {
        render(<CartCard 
            product={productMock}
            removeFromCart={removeFromCartMock}
            key={keyMock}
        />)

        const title = screen.getByRole("heading", {name: /t-shirt/i})
        const price = screen.getByText("$22.99");
        const image = screen.getByRole("img", {name: /t-shirt/i});
        const quantity = screen.getByText("x1");
        const remove = screen.getByRole("button", {name: /remove/i});

        const user = userEvent.setup();

        await user.click(remove);

        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(remove).toBeInTheDocument();
        expect(removeFromCartMock).toHaveBeenCalled();
        expect(removeFromCartMock).toBeCalledWith(productMock);
    })
})