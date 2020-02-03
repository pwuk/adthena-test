import { renderHook, act } from '@testing-library/react-hooks/lib/pure.js';
import { useFetch, useFindUser, useFindUserTodos } from './hooks';

test('should create correct state from fetch calls', () => {
  function mockFetch(data) {
    return jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => data
    }));
  }
  const mockData = { mockElement: 'mockValue' };
  window.fetch = mockFetch(mockData);

  const { result } = renderHook(() => useFetch('users'));

  act(() => {
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

    expect(result).toEqual({ current: [] });
  });
});

describe('should find user by username', () => {
  const mockUsers = [{
    username: 'fred',
    id: 101
  }, {
    username: 'barney',
    id: 102
  }, {
    username: 'freb',
    id: 103
  }];

  it('should find user by name', () => {
    const { result } = renderHook(() => useFindUser('fred', mockUsers));
    act(() => {
      expect(result).toEqual({ current: [mockUsers[0]] });
    });
  });

  it('should return empty array when there is no match', () => {
    const { result } = renderHook(() => useFindUser('wilma', mockUsers));
    act(() => {
      expect(result).toEqual({ current: [] });
    });
  });

  it('should return multiple users when there is a partial match', () => {
    const { result } = renderHook(() => useFindUser('fre', mockUsers));
    act(() => {
      expect(result).toEqual({ current: [mockUsers[0], mockUsers[2]] });
    });
  });
});

describe('should todo records by user id', () => {
  const mockTodos = [{
    userId: 101
  }, {
    userId: 102
  }, {
    userId: 103
  }];

  it('should find user by name', () => {
    const { result } = renderHook(() => useFindUserTodos([{ id: 102 }], mockTodos));
    act(() => {
      expect(result).toEqual({ current: [mockTodos[1]] });
    });
  });

  it('should return empty array when there is more than one user id', () => {
    const { result } = renderHook(() => useFindUserTodos([{ id: 101 }, { id: 102 }], mockTodos));
    act(() => {
      expect(result).toEqual({ current: [] });
    });
  });
});
