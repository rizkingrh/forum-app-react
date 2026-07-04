/**
 * Test Scenario for CommentInput component
 *
 * - CommentInput component
 *   - should render the textarea and submit button correctly
 *   - should disable the submit button when the textarea is empty
 *   - should disable the submit button when the textarea contains only whitespace
 *   - should enable the submit button when the textarea has valid content
 *   - should update textarea value as the user types
 *   - should call onSubmitComment with the typed content when the form is submitted
 *   - should clear the textarea after a successful submission
 *   - should not call onSubmitComment when the textarea is empty on submit
 *   - should not call onSubmitComment when the textarea contains only whitespace on submit
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('should render the textarea and submit button correctly', () => {
    // Arrange
    const onSubmitComment = vi.fn();

    // Action
    render(<CommentInput onSubmitComment={onSubmitComment} />);

    // Assert
    expect(
      screen.getByPlaceholderText('Share your thoughts on this thread...')
    ).toBeInTheDocument();
    expect(screen.getByTitle('Post Comment')).toBeInTheDocument();
  });

  it('should disable the submit button when the textarea is empty', () => {
    // Arrange
    const onSubmitComment = vi.fn();

    // Action
    render(<CommentInput onSubmitComment={onSubmitComment} />);

    // Assert
    expect(screen.getByTitle('Post Comment')).toBeDisabled();
  });

  it('should disable the submit button when the textarea contains only whitespace', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, '   ');

    // Assert
    expect(screen.getByTitle('Post Comment')).toBeDisabled();
  });

  it('should enable the submit button when the textarea has valid content', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, 'Great post!');

    // Assert
    expect(screen.getByTitle('Post Comment')).toBeEnabled();
  });

  it('should update textarea value as the user types', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, 'Hello, world!');

    // Assert
    expect(textarea).toHaveValue('Hello, world!!');
  });

  it('should call onSubmitComment with the typed content when the form is submitted', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, 'Great post!');
    await user.click(screen.getByTitle('Post Comment'));

    // Assert
    expect(onSubmitComment).toHaveBeenCalledOnce();
    expect(onSubmitComment).toHaveBeenCalledWith('Great post!');
  });

  it('should clear the textarea after a successful submission', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, 'Great post!');
    await user.click(screen.getByTitle('Post Comment'));

    // Assert
    expect(textarea).toHaveValue('');
  });

  it('should not call onSubmitComment when the textarea is empty on submit', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);

    // Action
    await user.keyboard('{Enter}');

    // Assert
    expect(onSubmitComment).not.toHaveBeenCalled();
  });

  it('should not call onSubmitComment when the textarea contains only whitespace on submit', async () => {
    // Arrange
    const onSubmitComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput onSubmitComment={onSubmitComment} />);
    const textarea = screen.getByPlaceholderText('Share your thoughts on this thread...');

    // Action
    await user.type(textarea, '   ');
    await user.keyboard('{Enter}');

    // Assert
    expect(onSubmitComment).not.toHaveBeenCalled();
  });
});
