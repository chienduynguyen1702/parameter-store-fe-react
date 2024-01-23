import { render } from '../test-utils';

import SignIn from '../../screens/SignIn';

describe('SignIn', () => {
  it('should be true', () => {
    render(<SignIn />);

    expect(true).toBe(true);
  });
});
