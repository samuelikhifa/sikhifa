import { NextRequest, NextResponse } from 'next/server';
import { projectStore } from '../../../lib/projects';

// GET - Fetch projects (public access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    type Filters = {
      status?: string;
      limit?: number;
      category?: string;
    };
    const filters: Filters = {};
    if (status) filters.status = status;
    if (limit) filters.limit = parseInt(limit);
    if (category) filters.category = category;
    
    const filteredProjects = projectStore.getFiltered(filters);

    // Log the projects being returned
    console.log('Returning projects:', filteredProjects.map(p => ({
      id: p.id,
      title: p.title,
      liveUrl: p.liveUrl,
      hasLiveUrl: !!p.liveUrl
    })));

    return NextResponse.json({
      success: true,
      data: filteredProjects
    });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 