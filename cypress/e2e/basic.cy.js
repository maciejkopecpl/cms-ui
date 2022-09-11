describe("e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays two leads", () => {
    cy.get("main .react-parallax h1").should("have.text", "Software Engineer");
    cy.get("main .react-parallax h2").should("have.text", "Maciej Kopeć");
  });

  it("displays `What I do...` second", () => {
    cy.get("main > div:nth-child(2) h2").should("have.text", "What I do...");
  });
});
