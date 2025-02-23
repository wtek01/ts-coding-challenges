import { EventEmitter } from "../../system-design/event-emitter/eventEmitter";

describe("EventEmitter", () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test("should add and trigger event listeners", () => {
    const mockFn = jest.fn();
    emitter.on("test", mockFn);
    emitter.emit("test", "data");
    expect(mockFn).toHaveBeenCalledWith("data");
  });

  test("should handle multiple listeners", () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    emitter.on("userAction", mockFn1);
    emitter.on("userAction", mockFn2);
    emitter.emit("userAction", "login");
    expect(mockFn1).toHaveBeenCalledWith("login");
    expect(mockFn2).toHaveBeenCalledWith("login");
  });

  test("should remove listeners with off()", () => {
    const mockFn = jest.fn();
    emitter.on("test", mockFn);
    emitter.off("test", mockFn);
    emitter.emit("test", "data");
    expect(mockFn).not.toHaveBeenCalled();
  });

  test("should handle once() listeners", () => {
    const mockFn = jest.fn();
    emitter.once("test", mockFn);
    emitter.emit("test", "first");
    emitter.emit("test", "second");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("first");
  });
});

// Garder la fonction de test manuel si nécessaire
export function testEventEmitter() {
  const emitter = new EventEmitter();

  console.log("🚀 Testing Event Emitter...\n");

  // Test multiple listeners
  console.log("🟢 Testing multiple listeners:");
  emitter.on("userAction", (action: string) => console.log(`Log: ${action}`));
  emitter.on("userAction", (action: string) =>
    console.log(`Notify: ${action}`)
  );
  emitter.on("userAction", (action: string) =>
    console.log(`Analytics: ${action}`)
  );
  emitter.emit("userAction", "login");

  // ... reste du code de test ...
}
