import React from 'react';
import { mount } from 'enzyme';
import PostList from './index';
import {
  posts,
  confirmDeletePosts,
} from './postData';

describe('PostList', () => {
  it('should trigger onEditClick', () => {
    const handleEditClick = jest.fn();
    const wrapper = mount(
      <PostList
        posts={posts}
        onDeleteCancel={() => {}}
        onDeleteClick={() => {}}
        onDeleteConfirmClick={() => {}}
        onEditClick={handleEditClick}
        onShareNowClick={() => {}}
      />,
    );
    // click on the edit button
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(handleEditClick)
      .toBeCalledWith({
        post: posts[0],
      });
  });

  it('should trigger onShareNowClick', () => {
    const handleShareNowClick = jest.fn();
    const wrapper = mount(
      <PostList
        posts={posts}
        onDeleteCancel={() => {}}
        onDeleteClick={() => {}}
        onDeleteConfirmClick={() => {}}
        onEditClick={() => {}}
        onShareNowClick={handleShareNowClick}
      />,
    );
    // click on the edit button
    wrapper
      .find('button')
      .at(2)
      .simulate('click');
    expect(handleShareNowClick)
      .toBeCalledWith({
        post: posts[0],
      });
  });

  it('should trigger onDeleteConfirmClick', () => {
    const handleDeleteConfirmClick = jest.fn();
    const wrapper = mount(
      <PostList
        posts={confirmDeletePosts}
        onDeleteCancel={() => {}}
        onDeleteClick={() => {}}
        onDeleteConfirmClick={handleDeleteConfirmClick}
        onEditClick={() => {}}
        onShareNowClick={() => {}}
      />,
    );
    // click on the confirm delete button
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(handleDeleteConfirmClick)
      .toBeCalledWith({
        post: confirmDeletePosts[0],
      });
  });

  it('should trigger onCancelConfirmClick', () => {
    const handleCancelConfirmClick = jest.fn();
    const wrapper = mount(
      <PostList
        posts={confirmDeletePosts}
        onCancelConfirmClick={handleCancelConfirmClick}
        onDeleteClick={() => {}}
        onDeleteConfirmClick={() => {}}
        onEditClick={() => {}}
        onShareNowClick={() => {}}
      />,
    );
    // click on the confirm delete button
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleCancelConfirmClick)
      .toBeCalledWith({
        post: confirmDeletePosts[0],
      });
  });

  it('should trigger onDeleteClick', () => {
    const handleDeleteClick = jest.fn();
    const wrapper = mount(
      <PostList
        posts={posts}
        onDeleteCancel={() => {}}
        onDeleteClick={handleDeleteClick}
        onDeleteConfirmClick={() => {}}
        onEditClick={() => {}}
        onShareNowClick={() => {}}
      />,
    );
    // click on the approve button
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleDeleteClick)
      .toBeCalledWith({
        post: posts[0],
      });
  });
});
