import resolveAccountFromAccountId from "./resolveAccountFromAccountId";

const fakeAccount = {
  _id: "123",
  name: "Bob Builder"
};

const fakeCart = {
  _id: "reaction/cart:1234",
  accountId: fakeAccount._id
};

test("calls queries.accounts.userAccount and returns the requested account", async () => {
  const userAccount = jest.fn().mockName("queries.accounts.userAccount").mockReturnValueOnce(Promise.resolve(fakeAccount));

  const accountObject = await resolveAccountFromAccountId(fakeCart, {}, { queries: { accounts: { userAccount } } });

  expect(accountObject).toEqual(fakeAccount);

  expect(userAccount).toHaveBeenCalled();
  expect(userAccount.mock.calls[0][1]).toBe(fakeCart.accountId);
});
