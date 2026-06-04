import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  it("should be defined", () => {
    expect(AppComponent).toBeDefined();
  });

  it("can be instantiated", () => {
    expect(new AppComponent()).toBeTruthy();
  });
});
