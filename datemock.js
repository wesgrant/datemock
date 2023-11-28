const OriginalDate = Date;
const fakeDateArgs = [2024, 1, 28]; // beware month is 0 based
let fakeDate;
Date = function Date(...args) {
    if (!new.target) {
        return OriginalDate(...args);
    }
    const ctor = new.target === Date ? OriginalDate : new.target;
    if (args.length !== 0) {
        return Reflect.construct(ctor, args);
    }
    fakeDate = Reflect.construct(ctor, fakeDateArgs);
    return fakeDate;
};
Object.defineProperty(Date, "length", {
    value: OriginalDate.length,
    configurable: true
});

Object.defineProperty(Date, "now", {
    value: () => fakeDate.getTime(),
    configurable: true
});
