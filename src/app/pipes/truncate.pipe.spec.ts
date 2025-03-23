import { TruncatePipe } from './truncate.pipe';

describe('TrancatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });
});
